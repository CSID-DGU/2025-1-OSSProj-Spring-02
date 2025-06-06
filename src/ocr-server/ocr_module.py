import cv2
import numpy as np
from PIL import Image
import pytesseract
import re
import datetime
import platform

if platform.system() == "Windows":
    pytesseract.pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"

def extract_business_info(image_stream):
    img = Image.open(image_stream)

    # 전처리: 업스케일 + Grayscale + Otsu + Morphology
    img = img.resize((int(img.width * 1.5), int(img.height * 1.5)), Image.LANCZOS)
    img_cv = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2GRAY)
    _, binary = cv2.threshold(img_cv, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    kernel = np.ones((2,1), np.uint8)
    cleaned = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)

    text = pytesseract.image_to_string(
        Image.fromarray(cleaned),
        lang='kor+eng',
        config='--oem 3 --psm 6'
    )

    # 1) 사업자번호 추출
    business_number = None
    m = re.search(
        r'(등록번호|사업자번호|사업자 등록번호|사업자)[:\s]*([0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{5})',
        text
    )
    if m:
        business_number = m.group(2)
    else:
        m1 = re.search(r'(\d{3})[-\s]?(\d{2})[-\s]?(\d{5})', text)
        if m1:
            business_number = f"{m1.group(1)}-{m1.group(2)}-{m1.group(3)}"

    # 2) 결제일(pay_date) 추출
    pay_date = None
    m2 = re.search(
        r'(발행일자|정산일시|거래일시)[:\s]*([0-9]{4}[-./][0-9]{2}[-./][0-9]{2})',
        text
    )
    if m2:
        raw = m2.group(2)
        pay_date = raw.replace('.', '-').replace('/', '-')
    else:
        dm = re.search(r'(\d{4}[-./]\d{2}[-./]\d{2})', text)
        if dm:
            pay_date = dm.group(1).replace('.', '-').replace('/', '-')

    # 3) 매장 이름(store_name)은 OCR 텍스트의 첫 번째 non-empty 라인 사용
    lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
    store_name = lines[0] if lines else None

    # 4) 성공 여부
    success = bool(business_number and pay_date)

    return {
        "success":    success,
        "businessNumber": business_number,
        "payDate":    pay_date,      # "yyyy-MM-dd" 포맷 문자열
        "storeName":  store_name,
        "message":    "추출 완료" if success else "일부 정보 추출 실패",
        "rawText":    text
    }
