#!/usr/bin/env bash
cd website
CURRENT_BRANCH=master USE_SSH=true ../node_modules/.bin/docusaurus-publish
cd ..