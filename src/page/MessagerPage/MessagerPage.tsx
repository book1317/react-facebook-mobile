import React from "react";
import css from "./MessagerPage.module.scss";
import { FaSearch } from "react-icons/fa";
import Member from "./Member";

const ICON_COLOR = "#68686A";

class MessagerPage extends React.Component {
  render() {
    return (
      <div className={css.messagerPageContainer}>
        <div className={css.headerContainer}>Chats</div>
        <div className={css.searchBoxContainer}>
          <FaSearch className={css.searchIcon} color={ICON_COLOR} />
          <input className={css.searchBox} placeholder="Seach"></input>
        </div>
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
      </div>
    );
  }
}

export default MessagerPage;
