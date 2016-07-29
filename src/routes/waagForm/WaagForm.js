/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './waagForm.css';
import WaagFormComponent from './WaagFormComponent';

class WaagForm extends Component {

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  componentWillMount() {
    this.context.setTitle(this.props.title);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h2>{this.props.path === '/' ? this.props.title : 'Create a New WaaG'}</h2>
            <WaagFormComponent />
        </div>
      </div>
    );
  }

}

export default withStyles(s)(WaagForm);
