#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Installing system dependencies..."
apt-get update && apt-get install -y tesseract-ocr

echo "Installing Python dependencies..."
pip install -r requirements.txt
