export interface UploadResult {
  url: string;
  filename: string;
  sizeBytes: number;
  sizeFormatted: string;
  mimeType: string;
  isMock: boolean;
}

export interface IStorageService {
  uploadDocument(file: File, bucket?: string): Promise<UploadResult>;
  uploadImage(file: File, bucket?: string): Promise<UploadResult>;
}

class LocalPrototypeStorageService implements IStorageService {
  private formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  async uploadDocument(file: File, _bucket: string = 'achievement-documents'): Promise<UploadResult> {
    // In Phase 1 Prototype: generate an in-memory Object URL for immediate preview
    // Phase 2 will execute: supabase.storage.from(bucket).upload(path, file)
    const objectUrl = URL.createObjectURL(file);
    return {
      url: objectUrl,
      filename: file.name,
      sizeBytes: file.size,
      sizeFormatted: this.formatSize(file.size),
      mimeType: file.type || 'application/pdf',
      isMock: true,
    };
  }

  async uploadImage(file: File, _bucket: string = 'project-images'): Promise<UploadResult> {
    const objectUrl = URL.createObjectURL(file);
    return {
      url: objectUrl,
      filename: file.name,
      sizeBytes: file.size,
      sizeFormatted: this.formatSize(file.size),
      mimeType: file.type || 'image/jpeg',
      isMock: true,
    };
  }
}

export const storageService: IStorageService = new LocalPrototypeStorageService();
