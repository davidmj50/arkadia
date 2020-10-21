import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { finalize } from "rxjs/operators";
import { UsersService } from "src/app/services/Impl/users.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private userService: UsersService, 
    private messageService: MessageService,
    private formbuilder: FormBuilder) {

    
  }

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      nombre: new FormControl("", Validators.required),
      apellido: new FormControl("", Validators.required),
      userName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      passwordrepet: new FormControl("", Validators.required),
      direccion: new FormControl("", Validators.required),
      telefono: new FormControl("", Validators.required),
      fecha_Nacimiento: new FormControl("", Validators.required)
    });
  }

  public newUser() {
    if (this.registerForm.valid) {
      let nombre = this.registerForm.get("nombre").value;
      let apellido = this.registerForm.get("apellido").value;
      let userName = this.registerForm.get("userName").value;
      let email = this.registerForm.get("email").value;
      let password: string = this.registerForm.get("password").value;
      let passwordrepet: string = this.registerForm.get("passwordrepet").value;
      let direccion = this.registerForm.get("direccion").value;
      let telefono = this.registerForm.get("telefono").value;
      let fecha_Nacimiento: string = this.registerForm.get("fecha_Nacimiento").value;
      
      if(password !== passwordrepet){
        this.messageService.add({severity:'warning', key: 'toastAdmin',summary:'Atención', detail:'La contraseña y la confirmación deben ser iguales.'});
        return;
      }
      
      this.userService.createUserCLient
        (
          email,
          userName,
          nombre,
          apellido,
          password,
          direccion,
          telefono,
          fecha_Nacimiento
        )
        .pipe(finalize(() => {}))
        .subscribe(
          (resp: any) => {
            this.messageService.add({severity:'success', key: 'toastAdmin',summary:'Usuario creado', detail:'Su usuario ha sido registrado correctamente!.'});
          },
          error => {
            this.messageService.add({severity:'error', key: 'toastAdmin',summary:'Atención', detail:'Ha ocurrido un error al guardar el usuario.'});
            console.log(error.error);
          }
        );
    }
  }
}
