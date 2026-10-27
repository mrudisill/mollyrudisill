"""Local preview server that tells the browser never to cache files,
so a normal refresh always shows your latest changes.

    python3 serve.py          → http://localhost:5173
"""
import functools
import http.server
import os
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
handler = functools.partial(NoCacheHandler, directory=os.path.dirname(os.path.abspath(__file__)))
print(f"serving on http://localhost:{port}")
http.server.ThreadingHTTPServer(("", port), handler).serve_forever()
