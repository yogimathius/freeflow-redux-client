import { connect } from 'react-redux'
import { setVisibilityFilter } from '../../reducers/filtersSlice'
import Link from './Link'

const mapStateToProps = (state, ownProps) => {
  return ({
    active: ownProps.filter === state.visibilityFilters
  })
}

const mapDispatchToProps = { setVisibilityFilter }

export default connect(mapStateToProps, mapDispatchToProps)(Link)
