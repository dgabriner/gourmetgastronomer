"""Upload dist/ to DreamHost via SFTP. Credentials come from the environment only."""

from __future__ import annotations

import os
import stat
from pathlib import Path

import paramiko

HOST = os.environ["GG_DEPLOY_HOST"]
USER = os.environ["GG_DEPLOY_USER"]
PASSWORD = os.environ["GG_DEPLOY_PASSWORD"]
REMOTE = os.environ["GG_DEPLOY_PATH"].rstrip("/")
LOCAL = Path(os.environ.get("GG_DEPLOY_LOCAL", "dist")).resolve()
PORT = int(os.environ.get("GG_DEPLOY_PORT", "22"))


def mkdir_p(sftp: paramiko.SFTPClient, remote_directory: str) -> None:
    parts: list[str] = []
    rest = remote_directory.rstrip("/")
    while rest and rest != "/":
        parts.append(rest)
        rest = rest.rsplit("/", 1)[0]
    for directory in reversed(parts):
        try:
            sftp.stat(directory)
        except FileNotFoundError:
            sftp.mkdir(directory)


def upload(sftp: paramiko.SFTPClient, local_path: Path, remote_path: str) -> int:
    if local_path.is_dir():
        mkdir_p(sftp, remote_path)
        count = 0
        for child in local_path.iterdir():
            count += upload(sftp, child, f"{remote_path}/{child.name}")
        return count
    mkdir_p(sftp, remote_path.rsplit("/", 1)[0])
    sftp.put(str(local_path), remote_path)
    sftp.chmod(remote_path, stat.S_IRUSR | stat.S_IWUSR | stat.S_IRGRP | stat.S_IROTH)
    return 1


def main() -> None:
    if not LOCAL.is_dir():
        raise SystemExit(f"missing local directory {LOCAL}")
    transport = paramiko.Transport((HOST, PORT))
    transport.connect(username=USER, password=PASSWORD)
    sftp = paramiko.SFTPClient.from_transport(transport)
    assert sftp is not None
    try:
        count = upload(sftp, LOCAL, REMOTE)
        leftover = f"{REMOTE}/styles.css"
        try:
            sftp.stat(leftover)
            sftp.remove(leftover)
            print("removed leftover placeholder styles.css")
        except FileNotFoundError:
            pass
        print(f"uploaded {count} files to {REMOTE}")
    finally:
        sftp.close()
        transport.close()


if __name__ == "__main__":
    main()
