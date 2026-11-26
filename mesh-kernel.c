// Build: clang --target=wasm32 -O3 -nostdlib -Wl,--no-entry -Wl,--export=volume -Wl,--export=__heap_base -Wl,--export-memory -o mesh-kernel.wasm mesh-kernel.c
// Geometry uses mm, double precision, unsigned 32 bit vertex indices.
double volume(const double *v, const unsigned *f, unsigned count) {
  double sum=0, compensation=0, bx=v[0],by=v[1],bz=v[2];
  for(unsigned i=0;i<count;i+=3){
    const double *a=v+3*f[i], *b=v+3*f[i+1], *c=v+3*f[i+2];
    double x=a[0]-bx,y=a[1]-by,z=a[2]-bz,u=b[0]-bx,w=b[1]-by,t=b[2]-bz,r=c[0]-bx,s=c[1]-by,q=c[2]-bz;
    double value=x*(w*q-t*s)+y*(t*r-u*q)+z*(u*s-w*r);
    double delta=value-compensation, next=sum+delta;
    compensation=(next-sum)-delta;sum=next;
  } return sum/6.0;
}
