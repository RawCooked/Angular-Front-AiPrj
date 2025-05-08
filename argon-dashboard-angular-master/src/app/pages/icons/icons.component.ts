import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  public copy: string;
  selectedFile: File | null = null;
  analysisType: string = '';
  selectedFileName: string = 'Choose file...';

  constructor() { }

  ngOnInit() { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }

  /* onSubmit(form: NgForm): void {
    if (form.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('analysisType', this.analysisType);
      
      // Add your API call here
      console.log('Form Data:', formData);
      
      // Reset form
      form.resetForm();
      this.selectedFile = null;
      this.selectedFileName = 'Choose file...';
      this.analysisType = '';
    }
  } */
    onSubmit(form: NgForm): void {
      if (form.valid && this.selectedFile) {
        // Create a blob from the selected file
        const blob = new Blob([this.selectedFile], { type: this.selectedFile.type });
        
        // Create a download link
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = this.selectedFile.name; // Use original file name
        
        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
        // Clean up
        window.URL.revokeObjectURL(downloadUrl);
    
        // Reset form
        form.resetForm();
        this.selectedFile = null;
        this.selectedFileName = 'Choose file...';
        this.analysisType = '';
      }
    }
}