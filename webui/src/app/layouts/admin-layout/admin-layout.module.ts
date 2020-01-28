import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent, MedicalRecordsDialog } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent, ProviderListDialog } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialogModule
} from '@angular/material';
import { ComponentsModule } from 'app/components/components.module';
import { ProDashboardComponent } from 'app/pro-dashboard/pro-dashboard.component';
import { ProTableListComponent, CreatePrescriptionDialog } from 'app/pro-table-list/pro-table-list.component';
import { ProUserProfileComponent } from 'app/pro-user-profile/pro-user-profile.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ComponentsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ProDashboardComponent,
    ProTableListComponent,
    ProUserProfileComponent,
    ProviderListDialog,
    MedicalRecordsDialog,
    CreatePrescriptionDialog
  ],
  entryComponents: [
    ProviderListDialog,
    MedicalRecordsDialog,
    CreatePrescriptionDialog
  ],
})

export class AdminLayoutModule { }
