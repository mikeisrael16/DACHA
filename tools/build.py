import sys,re,base64,os
src,assets,out=sys.argv[1:4]
s=open(src).read()
def uri(n):
    for ext,mt in (('webp','image/webp'),('jpg','image/jpeg')):
        f=os.path.join(assets,f'{n}.{ext}')
        if os.path.exists(f): return f'data:{mt};base64,'+base64.b64encode(open(f,'rb').read()).decode()
    raise SystemExit('missing '+n)
s=re.sub(r'__IMG_(\w+?)__',lambda m:uri(m.group(1)),s)
open(out,'w').write(s);print(len(s)//1024,'KB')
