import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends LoginComponent {



  user:any= this.us.getUser()

  
  
   
  
    


}


