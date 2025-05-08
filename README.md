# KneipenGuessr

![KneipenGuessr Logo](logo.png)

A fun, interactive web game that tests your knowledge of bars in Karlsruhe, Germany.

## Overview

KneipenGuessr challenges players to guess which of two bars is closer to their current location. The game uses your device's geolocation to calculate actual distances to various bars in Karlsruhe and presents them in pairs. Choose wisely and see how many bars you can correctly identify!

## Features

- **Location-based gameplay**: Uses your device's geolocation to calculate real distances
- **Timed challenges**: 10-second countdown for each decision
- **Easy/Debug Mode**: Toggle to display actual distances to bars
- **Victory celebration**: Fancy confetti animation when you successfully identify all bars :)
- **Responsive design**: Play on any device with geolocation capabilities

## How to Play

1. Allow the application to access your location when prompted
2. Two bars will be displayed on the screen
3. Select the bar you believe is closer to your current location
4. If correct, the closer bar stays and a new one appears
5. If incorrect, the game ends and your score is displayed
6. Try to identify as many bars as possible!

## Setup

1. Clone this repository
2. Create a `pem` directory in the project root
3. Generate a self-signed SSL certificate:
   ```bash
   openssl req -x509 -newkey rsa:4096 -keyout pem/key.pem -out pem/cert.pem -days 365 -nodes
   ```
4. Run the HTTPS server:
   ```bash
   python https_server.py
   ```
5. Open `https://localhost:8000/html/home_page.html` in your browser
6. Accept the security warning about the self-signed certificate
7. Allow location access when prompted
8. Start playing!

## Why a Server is Required

This application requires an HTTPS server for two main reasons:

1. **Browser Security Restrictions**: Modern browsers restrict access to the Geolocation API when pages are loaded directly from the file system (using the `file://` protocol). This is a security measure to protect user privacy.

2. **HTTPS Requirement**: The Geolocation API specifically requires a secure context (HTTPS) in most modern browsers, especially on mobile devices. The included `https_server.py` script creates a local HTTPS server with a self-signed certificate to satisfy this requirement.

## Technical Details

- Built with vanilla JavaScript, HTML, and CSS
- No external dependencies or frameworks required
- Uses the Geolocation API for location tracking (requires HTTPS)
- Implements the Haversine formula for accurate distance calculations
- Includes a Python-based HTTPS server with SSL for local deployment

## Bars Included

The game features 20 popular bars in Karlsruhe, including:
- Kippe 23
- Badisch Brauhaus
- Bierakademie
- Kap
- La Cage
- Lehners Wirtshaus
- Scruffy's
- Die Stadtmitte
- Gottesauer Eck
- Hoepfner Burghof
- And more!

## Privacy Note

KneipenGuessr requires access to your location to function properly. This data is used only for calculating distances to bars and is not stored or transmitted beyond your device.

## License

This project is open source and available for personal and educational use.

## Acknowledgments

- Inspired by GeoGuessr
- Special thanks to all the wonderful bars of Karlsruhe that make this game possible