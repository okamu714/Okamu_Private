from flask import Flask, render_template, request, redirect, url_for
import os
import pytesseract
from PIL import Image
import pandas as pd

app = Flask(__name__)
# アップロードされたファイルを保存するディレクトリ
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, port=5001)


@app.route('/', methods=['GET', 'POST'])
def process_image():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            file_path = os.path.join
            (app.config['UPLOAD_FOLDER'], file.filename)
            file.save(file_path)
            return redirect(url_for('index'))
    return render_template('index.html')


@app.route('/', methods=['GET', 'POST'])
def upload_image():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            file_path = os.path.join(
                app.config['UPLOAD_FOLDER'],
                file.filename
            )
            file.save(file_path)

            # OCR処理
            img = Image.open(file_path)
            text = pytesseract.image_to_string(
                img, lang='jpn'
            )
            return render_template('index.html', ocr_text=text)
    return render_template('index.html')


@app.route('/', methods=['GET', 'POST'])
def change_excel():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            file_path = os.path.join(
                app.config['UPLOAD_FOLDER'],
                file.filename
            )
            file.save(file_path)

            img = Image.open(file_path)
            text = pytesseract.image_to_string(img, lang='jpn')

            # テキスト処理
            processed_text = text.replace('旧キーワード', '新キーワード')

            # テキストをエクセルに変換して保存
            df = pd.DataFrame([processed_text.split('\n')])
            output_path = os.path.join('output', 'result.xlsx')
            df.to_excel(output_path, index=False)

            return render_template('index.html', ocr_text=processed_text)
    return render_template('index.html')
