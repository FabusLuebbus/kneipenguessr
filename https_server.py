import http.server
import ssl

# Define the server address and port
address = ('localhost', 8000)

# Configure the SSL context
ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
ssl_context.load_cert_chain(certfile='./pem/cert.pem', keyfile='./pem/key.pem')

# Create and start the HTTP server
httpd = http.server.HTTPServer(address, http.server.SimpleHTTPRequestHandler)
httpd.socket = ssl_context.wrap_socket(httpd.socket)
print('Starting server on https://{}:{}'.format(*address))
httpd.serve_forever()
