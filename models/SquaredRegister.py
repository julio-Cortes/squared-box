class SquaredRegister:
    def __init__(self, local_id: int, local_name:str,numero_caja: int, vendedor_id: int, vendedor_name:str, fecha_caja: str, empresa_id: int,
                 efectivo_real: int,
                 cigarros_real: int,
                 debito_real: int,
                 credito_real: int,
                 estado : int,
                 efectivo_cuadre: int = 0,
                 cigarros_cuadre: int = 0,
                 debito_cuadre: int = 0,
                 credito_cuadre: int = 0,
                 total: int = 0,
                 ):
        self.id = f"{local_id}-{numero_caja}-{vendedor_id}-{fecha_caja}"
        self.localId = local_id
        self.localName = local_name
        self.numeroCaja = numero_caja
        self.vendedorId = vendedor_id
        self.vendedorName = vendedor_name
        self.fechaCaja = fecha_caja
        self.empresaId = empresa_id
        self.efectivoReal = efectivo_real
        self.cigarrosReal = cigarros_real
        self.debitoReal = debito_real
        self.creditoReal = credito_real
        self.estado = estado
        self.efectivoCuadre = efectivo_cuadre
        self.cigarrosCuadre = cigarros_cuadre
        self.debitoCuadre = debito_cuadre
        self.creditoCuadre = credito_cuadre
        self.total = total

    def cast_to_json(self):
        return self.__dict__
