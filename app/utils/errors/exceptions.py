class APIError(Exception):
    """Base exception for API errors"""
    def __init__(self, message, status_code=400, payload=None):
        super().__init__()
        self.message = message
        self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        rv['status'] = 'error'
        return rv

class ValidationError(APIError):
    """Exception for validation errors"""
    def __init__(self, message, payload=None):
        super().__init__(message, status_code=400, payload=payload)

class NotFoundError(APIError):
    """Exception for resource not found"""
    def __init__(self, message="Resource not found", payload=None):
        super().__init__(message, status_code=404, payload=payload)

class AuthenticationError(APIError):
    """Exception for authentication errors"""
    def __init__(self, message="Authentication required", payload=None):
        super().__init__(message, status_code=401, payload=payload)

class AccessError(APIError):
    """Exception for authentication errors"""
    def __init__(self, message="Access denied for this source", payload=None):
        super().__init__(message, status_code=403, payload=payload)

class DatabaseError(APIError):
    """Exception for database errors"""
    def __init__(self, message="Database error occurred", payload=None):
        super().__init__(message, status_code=500, payload=payload)
