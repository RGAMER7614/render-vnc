FROM node:18-slim

# Install Chromium, X11 (Display), VNC, noVNC, and a Window Manager (fluxbox)
RUN apt-get update && apt-get install -y \
    chromium \
    xvfb x11vnc fluxbox \
    novnc websockify \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install --unsafe-perm

COPY . .

# Startup script to launch Display, VNC, noVNC and Node.js with optimized resolution
RUN echo '#!/bin/bash\n\
export DISPLAY=:99\n\
Xvfb :99 -screen 0 800x600x16 &\n\
sleep 2\n\
fluxbox &\n\
x11vnc -display :99 -nopw -forever -shared -bg\n\
websockify --web /usr/share/novnc/ 3000 localhost:5900 &\n\
node index.js\n\
' > start.sh && chmod +x start.sh

CMD ["./start.sh"]
