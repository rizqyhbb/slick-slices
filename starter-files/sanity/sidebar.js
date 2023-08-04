import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { SCHEMA } from './utils/const';

// build a custom sidebar
const Sidebar = () =>
  S.list()
    .title(`Slick's slices`)
    .items([
      // create new list item
      S.listItem()
        .title('Home page')
        .icon(() => <strong>🚀</strong>)
        .child(
          S.editor()
            .schemaType(SCHEMA.storeSetting)
            // create document id so the id on url not a random string
            .documentId('downtown')
        ),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== SCHEMA.storeSetting
      ),
    ]);

export default Sidebar;
