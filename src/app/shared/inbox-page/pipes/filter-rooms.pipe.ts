import { Pipe, PipeTransform } from '@angular/core';
import { Chat } from '../../../core/models/chat';

@Pipe({
  name: 'filterRooms'
})
export class FilterRoomsPipe implements PipeTransform {

  transform(rooms: Chat[], keyword: string): Chat[] {
    if (keyword) {
      return rooms.filter(x => x.project.name.toLowerCase().search(keyword.toLowerCase()) >= 0);
    } else {
      return rooms;
    }
  }

}
