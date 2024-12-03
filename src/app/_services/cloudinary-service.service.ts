import { Injectable } from '@angular/core';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { from, Observable } from 'rxjs';
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  constructor() {
    // Configuration de Cloudinary
    cloudinary.config({
      cloud_name: 'dltdj5ast',
      api_key: '948657262334426',
      api_secret: 'cQZex1sZKtKkohnWC5T07BnpESk',
    });
  }
  uploadMedia(file: File): Observable<string> {
    return new Observable((observer) => {
      const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          observer.error(error);  // Si une erreur survient lors de l'upload
        } else {
          observer.next(result?.secure_url);  // URL sécurisée du fichier
          observer.complete();
        }
      });

      // Convertir le fichier en Buffer si c'est nécessaire et l'envoyer au serveur Cloudinary
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const buffer = fileReader.result as ArrayBuffer;
        uploadStream.end(Buffer.from(buffer)); // Envoyer le fichier à Cloudinary
      };

      fileReader.readAsArrayBuffer(file); // Lire le fichier en tant qu'ArrayBuffer
    });
  }

  /**
   * Convertit un fichier en Buffer pour le téléchargement
   * @param file Fichier à convertir
   * @returns Promise<Buffer>
   */
  private async fileToBuffer(file: File): Promise<Buffer> {
    return Buffer.from(await file.arrayBuffer());
  }

  /**
   * Envoie un fichier depuis un chemin local vers Cloudinary
   * @param path Chemin du fichier local
   * @returns Observable avec l'URL publique du fichier téléchargé
   */
  uploadFileFromPath(path: string): Observable<string> {
    return from(
      new Promise<string>((resolve, reject) => {
        // Lire le fichier local en tant que buffer
        fs.readFile(path, (err, fileBuffer) => {
          if (err) {
            reject(err);
            return;
          }

          // Télécharger le fichier sur Cloudinary
          cloudinary.uploader.upload_stream((error, result) => {
            if (error) reject(error);
            else resolve(result!.secure_url);
          }).end(fileBuffer);
        });
      })
    );
  }

  /**
   * Télécharge un fichier depuis un URL et l'envoie à Cloudinary
   * @param url URL du fichier à télécharger
   * @returns Observable avec l'URL publique du fichier téléchargé
   */
  uploadFileFromUrl(url: string): Observable<string> {
    return new Observable<string>((observer) => {
      // Déterminer le protocole à utiliser (http ou https)
      const protocol = url.startsWith('https') ? https : http;

      protocol.get(url, (response) => {
        if (response.statusCode !== 200) {
          observer.error(new Error(`Failed to fetch file: ${response.statusCode}`));
          return;
        }

        // Récupérer le fichier via un stream
        let data: Buffer[] = [];
        response.on('data', (chunk) => {
          data.push(chunk);
        });

        response.on('end', () => {
          const fileBuffer = Buffer.concat(data);

          // Télécharger sur Cloudinary
          cloudinary.uploader.upload_stream((error, result) => {
            if (error) observer.error(error);
            else observer.next(result!.secure_url);
            observer.complete();
          }).end(fileBuffer);
        });
      }).on('error', (error) => {
        observer.error(error);
      });
    });
  }
}
