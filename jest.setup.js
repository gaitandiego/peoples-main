import '@testing-library/jest-dom';
import 'jest-fetch-mock';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.setMock('node-fetch', require('jest-fetch-mock'));
require('jest-fetch-mock').enableMocks();
