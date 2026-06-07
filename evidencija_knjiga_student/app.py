from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

knjige = []

@app.route("/api/books", methods=["GET"])
def dohvati_knjige():
    return jsonify(knjige)

@app.route("/api/books", methods=["POST"])
def dodaj_knjigu():
    nova_knjiga = request.get_json()
    nova_knjiga["id"] = len(knjige) + 1
    knjige.append(nova_knjiga)
    return jsonify(nova_knjiga)

@app.route("/api/books/<int:id>", methods=["DELETE"])
def obrisi_knjigu(id):
    for knjiga in knjige:
        if knjiga["id"] == id:
            knjige.remove(knjiga)
            return jsonify({"poruka": "Knjiga je obrisana"})
    return jsonify({"poruka": "Knjiga nije pronadena"})

if __name__ == "__main__":
    app.run(debug=True)
