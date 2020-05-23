import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import editorStyles from './editorStyles.module.css';
import mentionsStyles from './mentionsStyles.module.css';
import hashtagStyles from "./hashtagStyles.module.css";
import mentions from './mentions';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import 'draft-js/dist/Draft.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import Button from "../Button";

const Entry = (props) => {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  // title === creatorName
  // name === creatorHandle
  // I tried swapping around the variable names to match what I've got in my project
  // but Facebook seems to have hardcoded adding mentions to only look for a "name" property
  return (
    <div {...parentProps}>
      <div className={theme.mentionSuggestionsEntryContainer}>
        <div className={theme.mentionSuggestionsEntryContainerLeft}>
          <img
            src={mention.avatar}
            className={theme.mentionSuggestionsEntryAvatar}
            role="presentation"
          />
        </div>

        <div className={theme.mentionSuggestionsEntryContainerRight}>
          <div className={theme.mentionSuggestionsEntryText}>
            {mention.title}
          </div>

          <div className={theme.mentionSuggestionsEntryTitle}>
            @{mention.name}

          </div>
        </div>
      </div>
    </div>
  );
};

// const suggestionsFilter = (searchValue, suggestions) => {
//   let value = searchValue.toLowerCase();
//   let filteredSuggestions = suggestions.filter( (suggestion) => {
//     return !value || suggestion.creatorHandle.toLowerCase().indexOf(value) > -1;
//   });
//   console.log(filteredSuggestions);
//   let length = filteredSuggestions.length < 5 ? filteredSuggestions.length : 5;
//   console.log(filteredSuggestions.slice(0, length))
//   return filteredSuggestions.slice(0, length);
// };

export default class TweetInput extends Component {

  constructor(props) {
    super(props);
    this.props.setTweetText.bind(this);
    // this.props.setUsersMentionedArray.bind(this);
    this.props.handleAvatarClick.bind(this);
    this.hashtagPlugin = createHashtagPlugin({ theme: hashtagStyles });
    this.mentionPlugin = createMentionPlugin({
      mentions,
      entityMutability: 'IMMUTABLE',
      theme: mentionsStyles,
      mentionPrefix: '@',
      supportWhitespace: true
    });
  }

  state = {
    editorState: EditorState.createEmpty(),
    suggestions: mentions,
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
    let currentTweet = editorState.getCurrentContent().getPlainText('\u0001');
    this.props.setTweetText(currentTweet);

    const rawEditorContent = convertToRaw(editorState.getCurrentContent());
    const entityMap = rawEditorContent.entityMap;
    
    // console.log(mentionArray);
    // this.props.setUsersMentionedArray(entityMap);
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };

  onAddMention = (mention) => {
    // console.log("onAddmention", mention.name);
    // return mention.creatorHandle;
  }

  // This will get the hashtags out of the Editor
  extractHashTags = () => {
    let currentTweet = this.state.editorState.getCurrentContent().getPlainText('\u0001');
    let hashTags = currentTweet.split(' ').filter(v => v.startsWith('#'))
    return hashTags;
  }

  focus = () => {
    this.editor.focus();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let currentTweet = this.state.editorState.getCurrentContent().getPlainText('\u0001');
    const rawEditorContent = convertToRaw(this.state.editorState.getCurrentContent());
    const entityMap = rawEditorContent.entityMap;
    let mentionArray = Object.values(entityMap).map(entity => {
      return entity.data.mention.name;
    });
    // let html = stateToHTML(this.state.editorState);
    // console.log(html);
    this.props.handleInputSubmit(currentTweet, mentionArray);
  }

  render() {
    const { MentionSuggestions } = this.mentionPlugin;

    const plugins = [this.mentionPlugin, this.hashtagPlugin];
    

    // console.log(entityMap);
    // console.log(this.extractHashTags());
    // console.log(convertToRaw(this.state.editorState.getCurrentContent())); 
    let tweet = this.state.editorState.getCurrentContent().getPlainText('\u0001');;
    // console.log()
    return (
      <div className="compose-tweet">
        <form onSubmit={this.handleSubmit}>
        <div className="tweet-box">
        <img className="avatar" src={"https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2017/04/04/604513.jpg?itok=FqqfYOfA"} onClick={this.props.handleAvatarClick}/>
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="What's happening?"
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            entryComponent={Entry}
            onAddMention={this.onAddMention}
          />
        </div>
        </div>
          <div className="tweet-submit-options">
            <div className="tweet-submit-image-icon">
              <FontAwesomeIcon icon={faImages} size="lg" color="#1da1f2" />
            </div>
            <div className="tweet-submit-button">
              <div className={`character-counter ${tweet.length > 140 ? "__limit-reached" : " "}`}>
                <p>
                  {140 - tweet.length}
                </p>
              </div>
              <Button disabled={tweet.length === 0 || (tweet.length > 140)}>{this.props.buttonType === "reply" ? "Reply" : "Tweet"}</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
