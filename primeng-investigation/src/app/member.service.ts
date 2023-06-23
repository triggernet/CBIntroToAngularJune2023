import { Injectable } from '@angular/core';
import { MemberHttpService } from './member-http.service';
import { Member } from './member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  members:Member[] = [];

  constructor(private memberHttpService: MemberHttpService) { 

    this.memberHttpService.getAllMembers()
      .subscribe((members: Member[]) => {

        this.members = members;

      });
  }

  getAll(): Member[] {
    return this.members;
  }

  update(memberToUpdate: Member) {

    this.memberHttpService.update(memberToUpdate)
      .subscribe((updatedMember)=> {
        let index = this.members.findIndex(member=>member.id == memberToUpdate.id);
        this.members.splice(index, 1, updatedMember);
      });
  }

  delete(id: number) {

    this.memberHttpService.delete(id)
      .subscribe(()=>{
        let index = this.members.findIndex(member=>member.id == id);
        this.members.splice(index, 1);
      });
  }
  /**
   * 
   * @param memberToAdd 
   * @returns the newly added member including the assigned id
   */
  add(memberToAdd: Member): Member {

    console.log("running the add");
    // find maximum id from the current list
    //let maxId = this.members.reduce(
    //  (max, current) => current.id > max ? current.id : max, 
    //  this.members.length > 0 ? this.members[0].id : 0);
  
    //memberToAdd.id = maxId + 1;

    this.memberHttpService.add(memberToAdd)
      .subscribe(addedMember => {
        this.members.push(addedMember);
      })
      return memberToAdd;
  }
}
