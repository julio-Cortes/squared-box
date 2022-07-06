class Register:
    def __init__(self, vendor, local, date, number_of_register):
        self.vendor = vendor
        self.local = local
        self.date = date
        self.number_of_register = number_of_register
        self.document_types = []


class DocumentType:
    def __init__(self):
        self.type = None
        self.cash = None
        self.debit = None
        self.credit = None
        self.own_card = None
        self.coupon = None
        self.sb1 = None
        self.sb2 = None
        self.sb3 = None
        self.sb4 = None
        self.total = None


class SubMean:
    def __init__(self):
        self.sub_mean_id = None
        self.sub_mean_string = None
        self.sub_mean_value = None
