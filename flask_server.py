# flask_server.py

# Some simple code to serve some static files through a flask app
# JS files need to be in static folder, which flask automatically serves up
# html will be in template since we're using render_template()

from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def hello():
    message = "Hello, World"		#Unused
    return render_template('index.html', message=message)

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=8080)