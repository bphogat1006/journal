# Env vars

All the vars are loaded in at runtime and accessed with $env/dynamic/private.

EXCEPT for the URL prefix, which is required at build time and baked in. So it is passed as a docker build arg and then set in environment during the docker build.