import "../assets/css/message_style.css";
import '../assets/css/RemixIcone.css';
import '../assets/css/tailwindcss-colors.css';

import BarSide from "../components/BarSide";
import ContentSide from "../components/ContentSide";

function Chat() {
    return (
        <section class="chat-section">
            <><div class="chat-container">
                <BarSide/>
                <ContentSide/>
            </div></>
        </section>
    );
}

export default Chat;