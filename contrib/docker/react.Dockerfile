# # [ TODO ] mcr.microsoft.com/vscode/devcontainers/alpine
# # https://github.com/microsoft/vscode-dev-containers/blob/main/containers/javascript-node/.devcontainer/Dockerfile
# ARG VARIANT=16
# FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

# # [Optional] Uncomment this section to install additional OS packages.
# # RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
# #     && apt-get -y install --no-install-recommends <your-package-list-here>

# # [Optional] Uncomment if you want to install an additional version of node using nvm
# # ARG EXTRA_NODE_VERSION=10
# # RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# # [Optional] Uncomment if you want to install more global node modules
# RUN su node -c "npm install -g truffle"
FROM node:lts-alpine

USER root

RUN apk update && apk upgrade && apk add --no-cache git docker openrc python3 make g++ libstdc++
RUN rc-update add docker boot

WORKDIR /workspace/frontend