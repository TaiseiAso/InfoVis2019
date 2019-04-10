// Constructor
Vec3 = function(x, y, z){
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.z = parseFloat(z);
}

// Add method
Vec3.prototype.add = function(v){
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
}

// Sub method
Vec3.prototype.sub = function(v){
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
}

// Sum method
Vec3.prototype.sum = function(){
    return this.x + this.y + this.z;
}

// Min method
Vec3.prototype.min = function(){
    return Math.min(this.x, this.y, this.z);
}

// Mid method
Vec3.prototype.mid = function(){
    return [this.x, this.y, this.z].sort(this.compareFunc)[1];
}

// Max method
Vec3.prototype.max = function(){
    return Math.max(this.x, this.y, this.z);
}

// Compare function
Vec3.prototype.compareFunc = function(a, b){
    return a - b;
}

/////////////////////////////////////////

function AreaOfTriangle(v0, v1, v2){
    va = v1.sub(v0);
    vb = v2.sub(v0);
    v = Cross(va, vb);
    return Norm(v) * 0.5;
}

function Cross(va, vb){
    return new Vec3(va.y*vb.z - va.z*vb.y, va.z*vb.x - va.x*vb.z, va.x*vb.y - va.y*vb.x);
}

function Norm(v){
    return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
}
