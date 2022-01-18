#!/usr/bin/expect -f
#--chmod=755
rsync ./dist/*  -av -e 'ssh -p 2221' vesign@178.22.123.232:/home/vesign/front