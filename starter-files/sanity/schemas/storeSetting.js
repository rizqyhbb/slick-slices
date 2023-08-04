import { MdStore as icon } from 'react-icons/md';
import { SCHEMA } from '../utils/const';

export default {
  // Computer Name
  name: SCHEMA.storeSetting,
  // visible title
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'storeName',
      title: 'Store Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slicemaster',
      title: 'Slicemaster currently slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: SCHEMA.person }] }],
    },
    {
      name: 'hotSlices',
      title: 'Hot slices available',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: SCHEMA.pizza }] }],
    },
  ],
};
