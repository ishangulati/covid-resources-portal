export function WhatsAppChat(props: {
  sender: string;
  text: string;
  time: string;
}) {
  return (
    <div className="container">
      <div className="speech-wrapper">
        <div className="bubble">
          <div className="txt">
            <p className="name">
              {props.sender}
              <span></span>
            </p>
            <p className="message">{props.text}</p>
            <br/>
            <span className="timestamp">{props.time}</span>
          </div>
          <div className="bubble-arrow"></div>
        </div>
      </div>
    </div>
  );
}
