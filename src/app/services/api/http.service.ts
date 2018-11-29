import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retryWhen, mergeMap, finalize, catchError, map } from 'rxjs/operators';
import { timer, throwError, of, Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

/**
 * @Autor: Moisés Aguiar [09/11/2018]
 * @Modificado:
 * @Descripción:
 * @Version: 1.0
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiEndpoint = 'http://localhost/focqus-api/api/';
  private APPLICATION_KEY;
  private NUMERO_REINTENTOS_INVOCAR_API = 3;
  private TIEMPO_ESPERA_REINTENTOS_API = 3000;
  private INTERVALO_BUSQUEDA_NOTIFICACIONES = 8000;
  private TIMEOUT_INVOCACION_API;

  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW46MTIzNE',
      'x-api-key': 'CODEX@123'
    })
  };

  estrategiaReintentos: any;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  /**
   * SET ESTRATEGIA DE REINTENTOS
   */
  SET_ESTRATEGIA_REINTENTOS() {
    this.estrategiaReintentos = ({
      maxRetryAttempts = this.GET_NUMERO_REINTENTOS_INVOCAR_API(),
      scalingDuration = this.GET_TIEMPO_ESPERA_REINTENTOS_API(),
      /**
       * Si se desea excluir algún estado http para la transacción, se debe definir
       * en el siguiente array.
       */
      excludedStatusCodes = []
    }: {
        maxRetryAttempts?: number,
        scalingDuration?: number,
        excludedStatusCodes?: number[]
      } = {}) => (attempts: Observable<any>) => {
        return attempts.pipe(
          mergeMap((error, i) => {
            const retryAttempt = i + 1;
            /**
             * Si ya pasamos el máximo de reintentos
             * u obtuvimos algun código de respuesta http se arroja error.
             */
            if (
              retryAttempt > maxRetryAttempts ||
              excludedStatusCodes.find(e => e === error.status)
            ) {
              this.toastr.error(
                // tslint:disable-next-line:max-line-length
                'Ha ocurrido un error al establecer conexión con el servidor. Por favor entre en contacto con el personal de servicio técnico.',
                'Error de conexión'
              );
              return throwError(error);
            }
            // El tiempo de espera es escalable...
            return timer(retryAttempt * scalingDuration);
          }),
          finalize(() => console.log())
        );
      };
  }
  /**
   * GET Y SET DE VARIABLES DE CONFIGURACIÓN
   */

  GET_APPLICATION_KEY() {
    return this.APPLICATION_KEY;
  }

  GET_NUMERO_REINTENTOS_INVOCAR_API() {
    return this.NUMERO_REINTENTOS_INVOCAR_API;
  }

  GET_TIEMPO_ESPERA_REINTENTOS_API() {
    return this.TIEMPO_ESPERA_REINTENTOS_API;
  }

  GET_TIMEOUT_INVOCACION_API() {
    return this.TIMEOUT_INVOCACION_API;
  }

  GET_INTERVALO_BUSQUEDA_NOTIFICACIONES() {
    return this.INTERVALO_BUSQUEDA_NOTIFICACIONES;
  }

  private SET_APPLICATION_KEY(val) {
    this.APPLICATION_KEY = val;
  }

  private SET_NUMERO_REINTENTOS_INVOCAR_API(val) {
    this.NUMERO_REINTENTOS_INVOCAR_API = val;
  }

  private SET_TIEMPO_ESPERA_REINTENTOS_API(val) {
    this.TIEMPO_ESPERA_REINTENTOS_API = val;
  }

  private SET_TIMEOUT_INVOCACION_API(val) {
    this.TIMEOUT_INVOCACION_API = val;
  }

  private SET_INTERVALO_BUSQUEDA_NOTIFICACIONES(val) {
    this.INTERVALO_BUSQUEDA_NOTIFICACIONES = val;
  }

  private SET_ALL(parametros) {
    this.SET_NUMERO_REINTENTOS_INVOCAR_API(parametros.NUMERO_REINTENTOS_INVOCAR_API);
    this.SET_TIEMPO_ESPERA_REINTENTOS_API(parametros.TIEMPO_ESPERA_REINTENTOS_API);
    this.SET_INTERVALO_BUSQUEDA_NOTIFICACIONES(parametros.INTERVALO_BUSQUEDA_NOTIFICACIONES);
  }
  /**
   * GET:
   */
  get(recurso: string, customHeaders?) {
    const url = this.apiEndpoint + recurso;

    let headers = this.headers;
    if (customHeaders) {
      headers = {
        headers: new HttpHeaders(customHeaders)
      };
    }

    const datos = this.http.get(url, headers).pipe(
      map((respuesta: any) => {
        return this.procesarRespuesta(respuesta);
      }),
      retryWhen(this.estrategiaReintentos),
      catchError(error => of(error))
    );
    return datos;
  }
  /**
   * PATCH:
   */
  patch(recurso: string, data: any, customHeaders?) {
    const url = this.apiEndpoint + recurso;
    if (!this.estrategiaReintentos) {
      this.SET_ESTRATEGIA_REINTENTOS();
    }
    let headers = this.headers;
    if (customHeaders) {
      headers = {
        headers: new HttpHeaders(customHeaders)
      };
    }
    if (!this.estrategiaReintentos) {
      this.SET_ESTRATEGIA_REINTENTOS();
    }

    const datos = this.http.patch(url, data, headers).pipe(
      map(respuesta => {
        return this.procesarRespuesta(respuesta);
      }),
      retryWhen(this.estrategiaReintentos()),
      catchError(error => of(error))
    );

    return datos;
  }
  /**
   * POST:
   */
  post(recurso: string, data: any, headers?) {
    if (!this.estrategiaReintentos) {
      this.SET_ESTRATEGIA_REINTENTOS();
    }
    return this.http.post(recurso, data, this.headers).pipe(
      map(respuesta => {
        return this.procesarRespuesta(respuesta);
      }),
      retryWhen(this.estrategiaReintentos()),
      catchError(error => of(error))
    );
  }
  /**
   * PUT:
   */
  put(url, data: any, headers?) {
    if (!this.estrategiaReintentos) {
      this.SET_ESTRATEGIA_REINTENTOS();
    }

    return this.http.put(url, data, this.headers).pipe(
      retryWhen(this.estrategiaReintentos()),
      catchError(error => of(error))
    );
  }
  /**
   * DELETE:
   */
  delete(url, headers?) {
    if (!this.estrategiaReintentos) {
      this.SET_ESTRATEGIA_REINTENTOS();
    }
    return this.http.delete(url).pipe(
      retryWhen(this.estrategiaReintentos()),
      catchError(error => of(error))
    );
  }

  procesarRespuesta(respuesta: any) {
    switch (respuesta.status) {
      case 200:
      this.toastr.success(respuesta.description, 'Operation concluded')
        return respuesta;
      case 400:
        this.toastr.error(respuesta.description, 'Error');
        break;
      case 401:
        this.toastr.error(respuesta.description, 'No autorizado');
        return respuesta;
      case 403:
        break;
      case 500:
        this.toastr.warning(respuesta.description, 'Error');
        break;
    }
  }
}
