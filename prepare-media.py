from pathlib import Path
import subprocess,concurrent.futures,shutil
r=Path(__file__).resolve().parent
w=r.parent/'projectplayfield/runs/launch-revision/assets/source'
a=r/'dist/assets'
shutil.copy2(r.parent.parent/'outputs/branding/playfield-app-icon-projector-v2.png',a/'playfield-icon.png')
shutil.copytree(r.parent/'projectplayfield/runs/launch-final/assets/fonts',a/'fonts',dirs_exist_ok=True)
jobs=[('meteor',w/'IMG_1744.mp4',42,8),('cooking',w/'IMG_1745.mp4',20,5),('physics',w/'IMG_1752.mp4',2,7.4),('drawing',w/'IMG_1749.mp4',5.2,10)]
def video(j):
 n,p,start,d=j
 subprocess.run(['ffmpeg','-nostdin','-y','-v','error','-ss',str(start),'-i',str(p),'-t',str(d),'-vf','scale=1280:-2,fps=30','-an','-c:v','libx264','-preset','fast','-crf','25','-threads','2','-movflags','+faststart',str(a/f'{n}.mp4')],check=True)
 subprocess.run(['ffmpeg','-nostdin','-y','-v','error','-ss',str(start+2),'-i',str(p),'-frames:v','1','-vf','scale=1280:-2','-q:v','3',str(a/f'{n}.jpg')],check=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as ex:list(ex.map(video,jobs))
subprocess.run(['ffmpeg','-nostdin','-y','-v','error','-i',str(r.parent.parent/'outputs/Playfield-launch-final.mp4'),'-vf','scale=1280:-2,fps=30','-c:v','libx264','-preset','fast','-crf','26','-maxrate','1500k','-bufsize','3000k','-threads','4','-c:a','aac','-b:a','96k','-movflags','+faststart',str(a/'playfield-film.mp4')],check=True)
subprocess.run(['ffmpeg','-nostdin','-y','-v','error','-ss','24.8','-i',str(w/'rig-original.mp4'),'-frames:v','1','-q:v','2',str(a/'setup.jpg')],check=True)
print('Website media ready',flush=True)
