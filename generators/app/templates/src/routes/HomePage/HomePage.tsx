import * as React from 'react';
const { Component } = React;
import { connect } from 'dva';

import './HomePage.css';
var styles = require('./HomePage.scss');
var yeomanLogo = require('../../assets/yeoman-logo.png');

class HomePage extends Component<{}, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="container">
            <img src={yeomanLogo} className={styles.logo} />
        </div>
    }
}

export default connect(({ homepage }) => ({ homepage }))(HomePage);
