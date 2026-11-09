# Сборка index.html: python3 tools/build.py
import re,base64,os,json
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));S=R+'/src/';A=S+'assets'
head='''<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<meta name="theme-color" content="#3d6b2a">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<title>Ярославль: Моя дача</title>
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@500;700;800;900&display=swap" rel="stylesheet">
'''
css=open(S+'old_style.css').read()+open(S+'new.css').read()
js=''.join(open(S+f).read() for f in ['game1.js','game2.js','old_audio.js','game3.js','game4.js','game5.js','game6.js','game7.js','game8.js','game10.js','game11.js','game9.js'])
s=head+'<style>'+css+'</style>\n</head>\n<body>\n'+open(S+'body.html').read()+'<script>\n'+js+'\n</script>\n</body>\n</html>\n'
def uri(n):
    for ext,mt in (('webp','image/webp'),('jpg','image/jpeg')):
        f=os.path.join(A,f'{n}.{ext}')
        if os.path.exists(f): return f'data:{mt};base64,'+base64.b64encode(open(f,'rb').read()).decode()
    raise SystemExit('missing '+n)
names=sorted(set(os.path.splitext(f)[0] for f in os.listdir(A)))
s=s.replace('__IMGMAP__',json.dumps({n:uri(n) for n in names if n!='title2'}))
s=re.sub(r'__IMG_(\w+?)__',lambda m:uri(m.group(1)),s)
open(R+'/index.html','w').write(s);print(len(s)//1024,'KB')
