import { connect } from 'react-redux';
import { getChromeSync,
         setChromeSync } from '../../actions/stats_actions';

import Stats from './stats';

const mapStateToProps = state => {
  return { addresses: state['StatsReducer'] };
};

const mapDispatchToProps = dispatch => ({
  getChromeSync: () => dispatch(getChromeSync()),
  setChromeSync: (change) => dispatch(setChromeSync(change))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats);
