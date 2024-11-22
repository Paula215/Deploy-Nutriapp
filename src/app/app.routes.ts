import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authInverseGuard } from './core/guards/auth-inverse.guard';
import { NutritionalPlansComponent } from './pages/user/nutritional-plans/nutritional-plans.component';
import { MealDetailsComponent } from './pages/user/meal-details/meal-details.component';
import { HomeComponent } from './pages/user/home/home.component';
import { NgModule } from '@angular/core';
import { R } from '@angular/cdk/keycodes';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

export const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(a => a.authRoutes),
        canActivate:[authInverseGuard]
    },
    {
        path: 'user',
        loadChildren: () => import('./pages/user/user.routes').then(c => c.userRoutes),
        canActivate:[authGuard]
    },
    { 
        path: 'mail', 
        loadChildren: () => import('./pages/mail/mail.routes').then(c => c.mailRoutes),
    },
    {
        path: 'exercises',
        loadChildren: () => import('./pages/exercise/exercise.routes').then(e => e.exerciseRoutes),
        canActivate:[authGuard]
    },
    { path: 'nutritional-plans', component: NutritionalPlansComponent  },
    { path: 'meal/:id', component: MealDetailsComponent },
    { path: 'home', component: HomeComponent },    
    { path: '**', redirectTo: '/auth/login' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true, // Activa el uso de rutas con hash
            enableTracing: false, // Puedes habilitar esto para depuración si lo necesitas
        }),
    ],
    exports: [RouterModule],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule {}