import { AdapterEndpoint } from '@chainlink/external-adapter-framework/adapter'
import { InputParameters } from '@chainlink/external-adapter-framework/validation'
import { SingleNumberResultResponse } from '@chainlink/external-adapter-framework/util'
import { config } from '../config'
import overrides from '../config/overrides.json'
import { httpTransport } from '../transport/price'

// Input parameters define the structure of the request expected by the endpoint. The second parameter defines example input data that will be used in EA readme
export const inputParameters = new InputParameters(
  {
    fToken: {
      required: true,
      type: 'string',
      description: 'Address of the fToken to get the price for',
    },
    window: {
      required: true,
      type: 'number',
      description: 'Blocks to calculate the price over',
    },
    partitionSize: {
      required: true,
      type: 'number',
      description: 'Number of blocks to partition the window into',
    },
    calculationMethod: {
      required: true,
      options: ['AVERAGE', 'MEDIAN', 'VOLUME_WEIGHTED_AVERAGE'],
      type: 'string',
      description: 'Method to calculate the price',
    },
  },
  [
    {
      fToken: '0x465a5a630482f3abD6d3b84B39B29b07214d19e5', // fUSDC placeholder
      window: 100,
      partitionSize: 10,
      calculationMethod: 'AVERAGE',
    },
  ],
)
// Endpoints contain a type parameter that allows specifying relevant types of an endpoint, for example, request payload type, Adapter response type and Adapter configuration (environment variables) type
export type BaseEndpointTypes = {
  Parameters: typeof inputParameters.definition
  Response: SingleNumberResultResponse
  Settings: typeof config.settings
}

export const endpoint = new AdapterEndpoint({
  // Endpoint name
  name: 'price',
  // Alternative endpoint names for this endpoint
  aliases: [],
  // Transport handles incoming requests, data processing and communication for this endpoint
  transport: httpTransport,
  // Supported input parameters for this endpoint
  inputParameters,
  // Overrides are defined in the `/config/overrides.json` file. They allow input parameters to be overriden from a generic symbol to something more specific for the data provider such as an ID.
  overrides: overrides['flux-fToken'],
})
