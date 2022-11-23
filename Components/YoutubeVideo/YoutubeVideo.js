import YouTube from "react-youtube";

const YoutubeVideo = ({url}) => {
    const opts = {
        // height: 'auto',
        width: '100%',
        playerVars: {
            autoplay: 1, // 자동재생 0
            modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
        },
    }

    return <YouTube 
        videoId={url} 
        opts={opts} 
        // onReady={this._onReady} 
        onEnd={(e)=>{e.target.stopVideo(0);}} // 영상이 끝날 때 발생하는 이벤트
    />
}

export default YoutubeVideo;