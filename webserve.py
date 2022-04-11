# launch a simple, static web-server that handles .js and .mjs properly 
import http.server

HandlerClass = http.server.SimpleHTTPRequestHandler

# Patch in the correct extensions
HandlerClass.extensions_map['.js'] = 'text/javascript'
HandlerClass.extensions_map['.mjs'] = 'text/javascript'

# Run the server (like `python -m http.server` does)
http.server.test(HandlerClass, port=8000)
