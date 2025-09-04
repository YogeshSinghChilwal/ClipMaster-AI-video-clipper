from pytubefix import YouTube
from pytubefix.cli import on_progress

url1 = "https://youtu.be/yDSpTB0wRIs?si=1B523jm2LUxOzepp"
url2 = "https://youtu.be/EqBbtMSEfgQ?si=IFMALavOR3d1WzRR"
url3 = "https://youtu.be/_2YipyFJ_6E?si=SiMpaKHj6LL_DrFv"
url4 = "https://youtu.be/xAt1xcC6qfM?si=-LJZUY7jw29Rzlmf"

yt = YouTube(url3, on_progress_callback=on_progress)
print(yt.title)

ys = yt.streams.get_highest_resolution()
ys.download()
