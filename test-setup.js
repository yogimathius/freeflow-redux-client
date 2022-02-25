// setup file
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as matchers from 'jest-extended'

configure({ adapter: new Adapter() })
expect.extend(matchers)
