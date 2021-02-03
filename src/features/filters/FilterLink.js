import { connect } from 'react-redux'
import { setVisibilityFilter } from './filtersSlice'
import Link from './Link'

const mapStateToProps = (state, ownProps) => {
  // console.log("in map to state: ", state.visibilityFilters, ownProps.filter);
  return ({
  active: ownProps.filter === state.visibilityFilters
})}

const mapDispatchToProps = { setVisibilityFilter };

export default connect(mapStateToProps, mapDispatchToProps)(Link)
