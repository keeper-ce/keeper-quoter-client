#!/usr/bin/bash
rsync -vhz -r -e ssh --progress ./dist pi@{host-ip}:{path}