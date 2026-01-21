import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private readonly membersUrl = 'assets/data/members.json';

  constructor(private http: HttpClient) {}

  /** Get all members */
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersUrl);
  }

  /** Get member by ID */
  getMemberById(id: number): Observable<Member | undefined> {
    return this.getMembers().pipe(
      map(members => members.find(member => member.id === id))
    );
  }

  /** Add new member (mock/local) */
  addMember(newMember: Member): Member {
    // In real apps this would be a POST request
    return newMember;
  }
}
