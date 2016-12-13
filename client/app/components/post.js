import React from 'react';
import {Link} from 'react-router';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.comments = this.props.comments;
        this.state = {
          // Value of the text entry box.
          value: ""
        };

    }


    /**
     * Called when the user clicks the 'post' button.
     * Triggers the `onPost` prop if the post isn't empty, and clears
     * the component.
     */
    handlePost(e) {
      // Prevent the event from "bubbling" up the DOM tree.
      e.preventDefault();
      // Trim whitespace from beginning + end of entry.
      var statusUpdateText = this.state.value.trim();
      if (statusUpdateText !== "") {
        // Tell parent about post.
        this.props.onPost(statusUpdateText, this.state.imageUri);
        // Reset status update.
        this.setState({value: "", imageUri: null});
      }
    }

    /**
     * Called when the user types a character into the status update box.
     * @param e An Event object.
     */
    handleChange(e) {
      // Prevent the event from "bubbling" up the DOM tree.
      e.preventDefault();
      // e.target is the React Virtual DOM target of the input event -- the
      // <textarea> element. The textarea's `value` is the entire contents of
      // what the user has typed in so far.
      this.setState({value: e.target.value});
    }

    render()
    {


        return (
          <div>
          <div style={{"borderStyle": "groove"}} />
            <div className="row">
              <div className="col-md-10 forceWidth" style={{display: "block"}}>
                {this.comments.map(function(comment)
                  {
                    return (
                      <div key={comment.id}>
                        <div className="panel-body" style={{backgroundColor: "aliceBlue"}}>
                        <div className="col-md-10" style={{width: "100%"}}>
                          <ul className="nav nav-pills">
                            <li role="presentation" className="active">
                              <div className="controls text-wrap">
                                <p className="form-control-static post-text">
                                  {comment.commentText}
                                </p>
                              </div>
                            </li>
                            <li className="pull-right">
                              <a href="/profile.html" className="override-boostrap-hyperlink">{comment.person.fullName}</a>
                            </li>
                          </ul>
                        </div>
                        </div>
                      </div>
                    )
                  }, this)
                }
              </div>
            </div>
          </div>
        )

    }
  }
