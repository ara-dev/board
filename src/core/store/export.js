"use strict";
/*
import Konva, { default as konva } from 'konva'
import { model, page } from './jsonFormat'

class AdapterToJson {
  private adaptee: AdapteeToJSon
  constructor(adaptee: AdapteeToJSon) {
    this.adaptee = adaptee
  }

  public convertToJson(groups: konva.Group[]): model {
    const model: model = {
      id: 1,
      fonts: [],
      pages: [],
    }

    groups.forEach((item_group: konva.Group) => {
      const page: page = {
        id: item_group.id(),
        background: '',
        background_type: '',
        name: '',
        print_type: '',
        width: item_group.width(),
        height: item_group.height(),
        childrens: [],
      }
      page.childrens = this.adaptee.group(item_group)
      model.pages.push(page)
    })

    return model
  }
}

class AdapteeToJSon {
  public rect(rect: konva.Rect) {
    console.log('this is rect')
  }

  public circle(circle: konva.Circle) {
    console.log('this is Circle')
  }

  public regularPolygon(regularPolygon: konva.RegularPolygon) {
    console.log('this is RegularPolygon')
  }

  public group(group: konva.Group): children[] {
    //console.log('this is group')
    /!*const list: Array<konva.Group | konva.Shape> | undefined = group.children
  if (list != undefined) {
    list.forEach((item) => {
      if (item.getType() == 'Shape') {
        switch (item.getClassName()) {
          case 'Rect':
            _rect(item as konva.Rect)
            break
          case 'Circle':
            _circle(item as konva.Circle)
            break
          case 'RegularPolygon':
            _regularPolygon(item as konva.RegularPolygon)
            break
          case 'Path':
            _path(item as konva.Path)
            break
        }
      } else if (item.getType() == 'Group') {
        _group(item as konva.Group)
      }
    })
  }*!/
  }

  public path(path: konva.Path) {
    console.log('this is path')
  }

  public text(text: Konva.Text) {
    console.log('this is text')
  }

  public image(image: konva.Image) {
    console.log('this is image')
  }
}

export default function exportToJson(groups: konva.Group[]) {
  //console.log('this is model', model)
  return true

  //console.log('this is export', list)
}
*/
//# sourceMappingURL=export.js.map